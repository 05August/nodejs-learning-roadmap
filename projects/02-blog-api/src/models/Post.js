const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  excerpt: {
    type: String,
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  featuredImage: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  readTime: {
    type: Number, // in minutes
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for performance
postSchema.index({ slug: 1 });
postSchema.index({ author: 1 });
postSchema.index({ status: 1 });
postSchema.index({ publishedAt: -1 });
postSchema.index({ categories: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    return next();
  }
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true
  });
  
  next();
});

// Calculate read time based on content
postSchema.pre('save', function(next) {
  if (!this.isModified('content')) {
    return next();
  }
  
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readTime = Math.ceil(wordCount / wordsPerMinute);
  
  next();
});

// Generate excerpt if not provided
postSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

// Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to add like
postSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  if (!existingLike) {
    this.likes.push({ user: userId });
  }
  return this.save();
};

// Method to remove like
postSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  return this.save();
};

// Method to add comment
postSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content: content
  });
  return this.save();
};

// Transform output
postSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Post', postSchema); 
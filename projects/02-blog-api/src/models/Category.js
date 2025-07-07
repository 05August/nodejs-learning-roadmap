const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
    unique: true,
    maxlength: [50, 'Category name cannot be more than 50 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  color: {
    type: String,
    default: '#007bff',
    match: [/^#[0-9A-F]{6}$/i, 'Please provide a valid hex color']
  },
  icon: {
    type: String,
    default: null
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ sortOrder: 1 });

// Generate slug before saving
categorySchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  });
  
  next();
});

// Virtual for post count
categorySchema.virtual('postCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'categories',
  count: true
});

// Virtual for children categories
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Method to get all descendants
categorySchema.methods.getDescendants = async function() {
  const Category = this.constructor;
  const descendants = [];
  
  const findChildren = async (parentId) => {
    const children = await Category.find({ parent: parentId });
    for (const child of children) {
      descendants.push(child);
      await findChildren(child._id);
    }
  };
  
  await findChildren(this._id);
  return descendants;
};

// Transform output
categorySchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Category', categorySchema); 
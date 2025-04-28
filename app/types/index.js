// Note types - Converted to JSDoc comments for better IDE support
/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} [summary]
 * @property {string} [sentiment]
 * @property {string[]} category_ids
 * @property {Category[]} categories
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} NoteCreate
 * @property {string} title
 * @property {string} content
 * @property {string[]} [category_ids]
 */

/**
 * @typedef {Object} NoteUpdate
 * @property {string} [title]
 * @property {string} [content]
 * @property {string[]} [category_ids]
 * @property {string} [summary]
 * @property {string} [sentiment]
 */

/**
 * @typedef {Object} NoteSearchQuery
 * @property {string} [keyword]
 * @property {string} [category_id]
 * @property {string} [natural_language_query]
 */

// Category types
/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} [notes_count]
 */

/**
 * @typedef {Object} CategoryCreate
 * @property {string} name
 * @property {string} [description]
 */

/**
 * @typedef {Object} CategoryUpdate
 * @property {string} [name]
 * @property {string} [description]
 */
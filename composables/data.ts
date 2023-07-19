/**
 * Removes all properties with undefined and false values from an object
 */
export function trimFalseProps (obj: { [key: string]: any }) {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === false) {
      delete obj[key]
    }
    else if (typeof obj[key] === 'object') {
      trimFalseProps(obj[key])
    }
  }
  return obj
}

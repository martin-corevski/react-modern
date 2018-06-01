// Utility functions for leaner switch cases inside the reducers
export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

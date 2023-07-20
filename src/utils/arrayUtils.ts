/**
 * Updates the task after drag and drop operation.
 *
 * @param {Array} listTasks - The list of tasks.
 * @param {Object} destination - The destination object containing droppableId and index.
 * @param {Object} source - The source object containing droppableId and index.
 * @param {string} id - The ID of the task being dragged.
 * @returns {Object} - An object containing the updated list of tasks and the updated tasks.
 */
export const updateTaskAfterDND = (listTasks, destination, source, id) => {
  let sourceColumn = filtersTasksByColumnID(listTasks, source.droppableId);
  const currentTask = sourceColumn.find(item => item._id === id);

  if (source.droppableId !== destination.droppableId) {
    // different Column
    let destinationColumn = filtersTasksByColumnID(listTasks, destination.droppableId);
    const restColumns = listTasks.filter(
      item => item.column_id !== destination.droppableId && item.column_id !== source.droppableId,
    );
    // remove Task in source col
    sourceColumn = removeElementAtIndex(sourceColumn, source.index);
    // arrange Task in source col
    sourceColumn = sourceColumn.map((item, index) => ({ ...item, sort: index }));

    if (destination.index === 0) {
      // add Task in front of destination
      destinationColumn.unshift({ ...currentTask, column_id: destination.droppableId });
      // arrange Task in destination col
      destinationColumn = destinationColumn.map((item, index) => ({ ...item, sort: index }));
    } else {
      destinationColumn = addElementAtIndex(destinationColumn, destination.index, {
        ...currentTask,
        column_id: destination.droppableId,
      });
      // arrange Task in destination col
      destinationColumn = destinationColumn.map((item, index) => ({ ...item, sort: index }));
    }
    const updatedTask: any[] = [...sourceColumn, ...destinationColumn].map(t => ({
      _id: t._id,
      column_id: t.column_id,
      sort: t.sort,
    }));
    return {
      tasks: [...restColumns, ...sourceColumn, ...destinationColumn],
      updated: updatedTask,
    };
  } else {
    // same Column
    const restColumns = listTasks.filter(item => item.column_id !== source.droppableId);
    // move Task in new position in source col
    sourceColumn = moveElement(sourceColumn, currentTask, destination.index);
    // arrange Task in source col
    sourceColumn = sourceColumn.map((item, index) => ({ ...item, sort: index }));

    const updatedTask: any[] = sourceColumn.map(t => ({
      _id: t._id,
      column_id: t.column_id,
      sort: t.sort,
    }));

    return {
      tasks: [...restColumns, ...sourceColumn],
      updated: updatedTask,
    };
  }
};

/**
 * Sorts an array of board columns based on the 'sort' property.
 *
 * @param {Array} board_columns - The array of board columns to be sorted.
 * @returns {Array} - The sorted array of board columns.
 */
export function sortArray(board_columns) {
  if (!Array.isArray(board_columns)) {
    return []; // hoặc xử lý theo yêu cầu của bạn khi `board_columns` không phải là mảng
  }

  const columns = [...board_columns];
  columns.sort((a, b) => {
    return a.sort - b.sort;
  });
  return columns;
}

/**
 * Filters tasks by column ID in an array.
 *
 * @param listTasks
 * @param {string} columnID - The column ID to filter tasks by.
 * @returns {Array} - The filtered array of tasks.
 */
const filtersTasksByColumnID = (listTasks, columnID) => {
  return listTasks.filter(item => item.column_id === columnID);
};

/**
 * Removes an element from an array at the specified index.
 *
 * @param {Array} array - The array to remove the element from.
 * @param {number} index - The index of the element to remove.
 * @returns {Array} - The array with the element removed.
 */
function removeElementAtIndex(array, index) {
  if (index < 0 || index >= array.length) {
    return array;
  }
  array.splice(index, 1);
  return array;
}

/**
 * Adds an element to an array at the specified index.
 *
 * @param {Array} array - The array to add the element to.
 * @param {number} index - The index at which to add the element.
 * @param {*} element - The element to add.
 * @returns {Array} - The array with the element added.
 */
function addElementAtIndex(array, index, element) {
  if (index < 0 || index > array.length) {
    return array;
  }
  array.splice(index, 0, element);
  return array;
}

/**
 * Moves an element within an array to a new index.
 *
 * @param {Array} array - The array containing the element.
 * @param {*} element - The element to move.
 * @param {number} newIndex - The new index for the element.
 * @returns {Array} - The array with the element moved to the new index.
 */
function moveElement(array, element, newIndex) {
  const currentIndex = array.indexOf(element);
  if (currentIndex === -1 || newIndex < 0 || newIndex >= array.length) {
    return array;
  }
  const newArray = [...array];
  newArray.splice(currentIndex, 1);
  newArray.splice(newIndex, 0, element);

  return newArray;
}

export function sortArray(board_columns) {
  board_columns.sort((a, b) => {
    return a.sort - b.sort;
  });

  return board_columns;
}

export const updateTaskAfterDNDV2 = (listTasks, id, newColumnID, newSort, sourceColumnID) => {
  if (newColumnID === sourceColumnID) {
    // in Column
    let column = findArrayTasksByColumnID(listTasks, newColumnID);
    if (newSort === 0) {
      column = column.map(item => ({ ...item, sort: item.sort + 1 }));
      column.unshift();
    } else if (newSort) {
    }
  } else {
    // out Column
    let sourceColumn = findArrayTasksByColumnID(listTasks, sourceColumnID);
    let destinationColumn = findArrayTasksByColumnID(listTasks, newColumnID);
    const currentTask = sourceColumn.find(item => item._id === id);
    if (newSort === 0) {
      // update Source column
      // sourceColumn = removeElementAtIndex(sourceColumn);
      // sourceColumn = sourceColumn
      //   .filter(element => element._id !== currentTask._id)
      //   .map((element, index, array) => {
      //     if (index < array.length - 1 && element.sort > array[index + 1].sort) {
      //       return { ...element, sort: element.sort - 1 };
      //     }
      //     return element;
      //   });
      // update New Column
      destinationColumn = destinationColumn.map(item => ({ ...item, sort: item.sort + 1 }));
      destinationColumn.unshift({ ...currentTask, sort: 0 });
      console.log('Current Task: ', currentTask);
      console.log('Column Current: ', sourceColumn);
      console.log('Destination: ', destinationColumn);
    } else {
      // update New Column
      destinationColumn = addElementWithSort(destinationColumn, currentTask);
      // update Source column
      sourceColumn = removeElementWithSort(sourceColumn, currentTask._id);
      console.log('Current Task: ', currentTask);
      console.log('Column Current: ', sourceColumn);
      console.log('Destination: ', destinationColumn);
    }
  }

  // set Vi Tri

  // Update Vitri các task con lai
  return listTasks.map(item =>
    item._id === id
      ? {
          ...item,
          sort: newSort,
          column_id: newColumnID,
        }
      : item,
  );
};
const findArrayTasksByColumnID = (listTasks, columnID) => {
  return listTasks.filter(item => item.column_id === columnID);
};

export const updateTaskAfterDND = (listTasks, destination, source, id) => {
  let sourceColumn = findArrayTasksByColumnID(listTasks, source.droppableId);

  if (source.droppableId !== destination.droppableId) {
    let destinationColumn = findArrayTasksByColumnID(listTasks, destination.droppableId);
    const restColumns = listTasks.filter(
      item => item.column_id !== destination.droppableId && item.column_id !== source.droppableId,
    );

    const currentTask = sourceColumn.find(item => item._id === id);
    sourceColumn = removeElementAtIndex(sourceColumn, source.index);
    sourceColumn = sourceColumn.map((item, index) => ({ ...item, sort: index }));

    if (destination.index === 0) {
      destinationColumn.unshift({ ...currentTask, column_id: destination.droppableId });
      destinationColumn = destinationColumn.map((item, index) => ({ ...item, sort: index }));
    } else {
      destinationColumn = addElementAtIndex(destinationColumn, destination.index, {
        ...currentTask,
        column_id: destination.droppableId,
      });

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
    const restColumns = listTasks.filter(item => item.column_id !== source.droppableId);
    const currentTask = sourceColumn.find(item => item._id === id);
    sourceColumn = moveElement(sourceColumn, currentTask, destination.index);
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

function addElementWithSort(array, newElement) {
  const maxSort = Math.max(...array.map(element => element.sort));
  const newElementSort = maxSort + 1;

  const newArray = array.map(element => {
    if (element.sort >= newElementSort) {
      return { ...element, sort: element.sort + 1 };
    }
    return element;
  });

  newArray.splice(newElementSort - 1, 0, { ...newElement, sort: newElementSort });

  return newArray;
}

function removeElementWithSort(array, elementId) {
  const elementIndex = array.findIndex(element => element.id === elementId);
  if (elementIndex === -1) {
    // Phần tử không tồn tại trong mảng
    return array;
  }

  return array
    .filter(element => element.id !== elementId)
    .map(element => {
      if (element.sort > array[elementIndex].sort) {
        // Giảm giá trị sort cho các phần tử có sort lớn hơn
        return { ...element, sort: element.sort - 1 };
      }
      return element;
    });
}

function removeElementAtIndex(array, index) {
  if (index < 0 || index >= array.length) {
    // Index không hợp lệ
    return array;
  }
  array.splice(index, 1); // Xóa phần tử tại index

  return array;
}

function addElementAtIndex(array, index, element) {
  if (index < 0 || index > array.length) {
    // Index không hợp lệ
    return array;
  }

  array.splice(index, 0, element); // Thêm phần tử vào index

  return array;
}

function moveElement(array, element, newIndex) {
  const currentIndex = array.indexOf(element);
  if (currentIndex === -1 || newIndex < 0 || newIndex >= array.length) {
    // Phần tử không tồn tại hoặc vị trí mới không hợp lệ
    return array;
  }
  const newArray = [...array]; // Tạo một bản sao của mảng để không ảnh hưởng đến mảng gốc
  newArray.splice(currentIndex, 1); // Xóa phần tử cũ từ mảng
  newArray.splice(newIndex, 0, element); // Thêm phần tử vào vị trí mới

  return newArray;
}

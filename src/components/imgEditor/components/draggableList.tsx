import { ReactNode } from "react";

import { Filters, Transforms } from "../constants";
import { FilterValue, TransformValue } from "../types";

import {
  DragDropContext,
  Draggable,
  DraggableStyle,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

import { Box, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type Item<T, K, V> = T & { key: K; value: V };

interface DraggableListProps<T, K, V> {
  items: Item<T, K, V>[];
  componentFunc(idx: number, key: K, value: V): ReactNode;
  update(newItems: Item<T, K, V>[]): void;
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggableStyle
) => ({
  paddingTop: "10px",
  display: "flex",
  alignItems: "baseline",
  borderRadius: "8px",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  borderRadius: "8px",
  backgroundColor: isDraggingOver ? "background.default" : "background.soft",
});

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function DraggableList<T, K, V>({
  items,
  componentFunc,
  update,
}: DraggableListProps<T, K, V>) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    update(reorder(items, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map(({ key, value }, idx) => (
              <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                {(provided, snapshot) => (
                  <Box
                    sx={{
                      backgroundColor: "background.soft",
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <IconButton {...provided.dragHandleProps}>
                      <DragIndicatorIcon />
                    </IconButton>
                    {componentFunc(idx, key, value)}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export const ListTransform = DraggableList<
  TransformValue,
  Transforms,
  number | [number, number]
>;
export const ListFilter = DraggableList<
  FilterValue,
  Filters,
  number | [number, number, number, string]
>;

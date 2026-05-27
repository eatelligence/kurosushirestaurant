"use client";

import { ReactNode, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: {
  items: T[];
  onReorder: (orderedIds: string[]) => void | Promise<void>;
  renderItem: (item: T, handle: ReactNode) => ReactNode;
}) {
  const [list, setList] = useState(items);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Sync when parent updates items (e.g. after revalidation)
  if (items !== list && items.map((i) => i.id).join() !== list.map((i) => i.id).join()) {
    setList(items);
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = list.findIndex((i) => i.id === active.id);
    const newIdx = list.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    const next = arrayMove(list, oldIdx, newIdx);
    setList(next);
    onReorder(next.map((i) => i.id));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={list.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-3">
          {list.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {(handle) => renderItem(item, handle)}
            </SortableRow>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  id,
  children,
}: {
  id: string;
  children: (handle: ReactNode) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  const handle = (
    <button
      type="button"
      {...attributes}
      {...listeners}
      aria-label="Arrastrar para reordenar"
      className="cursor-grab active:cursor-grabbing text-kuro-ash hover:text-kuro-cream transition-colors p-2 -ml-2 touch-none"
    >
      <GripVertical size={16} strokeWidth={1.4} />
    </button>
  );
  return (
    <li ref={setNodeRef} style={style}>
      {children(handle)}
    </li>
  );
}

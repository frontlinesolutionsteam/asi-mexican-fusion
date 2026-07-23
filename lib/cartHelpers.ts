import type { MenuItem, ModifierGroup } from "@/config/site";
import type { CartLine, SelectedOption } from "@/components/cart/CartProvider";

let counter = 0;
export function makeLineId(): string {
  counter += 1;
  return `line-${Date.now().toString(36)}-${counter}`;
}

/** Selections map: groupId -> optionId[] */
export type SelectionMap = Record<string, string[]>;

/** First choice for every required group — a valid default configuration. */
export function defaultSelections(item: MenuItem): SelectionMap {
  const map: SelectionMap = {};
  for (const group of item.options ?? []) {
    if (group.required && group.options.length) {
      map[group.id] = [group.options[0].id];
    } else {
      map[group.id] = [];
    }
  }
  return map;
}

export function selectionsToList(item: MenuItem, map: SelectionMap): SelectedOption[] {
  const list: SelectedOption[] = [];
  for (const group of item.options ?? []) {
    for (const optId of map[group.id] ?? []) {
      const opt = group.options.find((o) => o.id === optId);
      if (opt) {
        list.push({
          groupId: group.id,
          optionId: opt.id,
          label: opt.label,
          price: opt.price ?? 0,
        });
      }
    }
  }
  return list;
}

export function lineUnitPrice(item: MenuItem, selections: SelectedOption[]): number {
  const add = selections.reduce((sum, s) => sum + s.price, 0);
  return Math.round((item.price + add) * 100) / 100;
}

export function buildLine(
  item: MenuItem,
  map: SelectionMap,
  quantity = 1,
  note?: string,
): CartLine {
  const selections = selectionsToList(item, map);
  return {
    lineId: makeLineId(),
    itemId: item.id,
    name: item.name,
    image: item.image,
    basePrice: item.price,
    unitPrice: lineUnitPrice(item, selections),
    quantity,
    selections,
    note: note?.trim() || undefined,
  };
}

/** True if the item has any choices worth showing a modal for. */
export function hasOptions(item: MenuItem): boolean {
  return !!item.options?.some((g: ModifierGroup) => g.options.length > 0);
}

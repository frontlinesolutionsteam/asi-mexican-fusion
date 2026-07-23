"use client";

import { createContext, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { site, menu, type MenuItem } from "@/config/site";

export type SelectedOption = { groupId: string; optionId: string; label: string; price: number };

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  image: string;
  basePrice: number;
  unitPrice: number; // base + selected option prices
  quantity: number;
  selections: SelectedOption[];
  note?: string;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; line: CartLine }
  | { type: "setQty"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string }
  | { type: "clear" };

function sameConfig(a: CartLine, b: CartLine) {
  if (a.itemId !== b.itemId) return false;
  const sa = a.selections.map((s) => `${s.groupId}:${s.optionId}`).sort().join("|");
  const sb = b.selections.map((s) => `${s.groupId}:${s.optionId}`).sort().join("|");
  return sa === sb && (a.note || "") === (b.note || "");
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => sameConfig(l, action.line));
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.lineId === existing.lineId
              ? { ...l, quantity: l.quantity + action.line.quantity }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, action.line] };
    }
    case "setQty":
      return {
        lines: state.lines
          .map((l) => (l.lineId === action.lineId ? { ...l, quantity: action.quantity } : l))
          .filter((l) => l.quantity > 0),
      };
    case "remove":
      return { lines: state.lines.filter((l) => l.lineId !== action.lineId) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  tax: number;
  totalBeforeTip: number;
  addLine: (line: CartLine) => void;
  setQty: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getMenuItem: (id: string) => MenuItem | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);

// One-time cleanup of the cart persistence this app used to have. Runs once
// at module load in the browser — not tied to a component lifecycle, so it
// can't reintroduce state restoration.
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("asi-cart-v1");
  } catch {
    /* storage unavailable — nothing to clean up */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Intentionally in-memory only — no localStorage/sessionStorage/cookie
  // persistence. Every page load starts with an empty cart by design.
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    [state.lines],
  );
  const count = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines],
  );
  const tax = useMemo(() => Math.round(subtotal * site.ordering.taxRate * 100) / 100, [subtotal]);

  const value: CartContextValue = {
    lines: state.lines,
    count,
    subtotal,
    tax,
    totalBeforeTip: subtotal + tax,
    addLine: (line) => {
      dispatch({ type: "add", line });
      setIsOpen(true);
    },
    setQty: (lineId, quantity) => dispatch({ type: "setQty", lineId, quantity }),
    removeLine: (lineId) => dispatch({ type: "remove", lineId }),
    clear: () => dispatch({ type: "clear" }),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    getMenuItem: (id) => menu.find((m) => m.id === id),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

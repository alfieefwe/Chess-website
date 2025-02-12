import "./ChessBoardStyle.css";
import React from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Piece from "./piece";

const initialPieces = [
  // Black pieces
  { id: "rook1-black", type: "♜", color: "black", position: "a8" },
  { id: "knight1-black", type: "♞", color: "black", position: "b8" },
  { id: "bishop1-black", type: "♝", color: "black", position: "c8" },
  { id: "queen-black", type: "♛", color: "black", position: "d8" },
  { id: "king-black", type: "♚", color: "black", position: "e8" },
  { id: "bishop2-black", type: "♝", color: "black", position: "f8" },
  { id: "knight2-black", type: "♞", color: "black", position: "g8" },
  { id: "rook2-black", type: "♜", color: "black", position: "h8" },
  { id: "pawn1-black", type: "♟", color: "black", position: "a7" },
  { id: "pawn2-black", type: "♟", color: "black", position: "b7" },
  { id: "pawn3-black", type: "♟", color: "black", position: "c7" },
  { id: "pawn4-black", type: "♟", color: "black", position: "d7" },
  { id: "pawn5-black", type: "♟", color: "black", position: "e7" },
  { id: "pawn6-black", type: "♟", color: "black", position: "f7" },
  { id: "pawn7-black", type: "♟", color: "black", position: "g7" },
  { id: "pawn8-black", type: "♟", color: "black", position: "h7" },

  // White pieces
  { id: "rook1-white", type: "♖", color: "white", position: "a1" },
  { id: "knight1-white", type: "♘", color: "white", position: "b1" },
  { id: "bishop1-white", type: "♗", color: "white", position: "c1" },
  { id: "queen-white", type: "♕", color: "white", position: "d1" },
  { id: "king-white", type: "♔", color: "white", position: "e1" },
  { id: "bishop2-white", type: "♗", color: "white", position: "f1" },
  { id: "knight2-white", type: "♘", color: "white", position: "g1" },
  { id: "rook2-white", type: "♖", color: "white", position: "h1" },
  { id: "pawn1-white", type: "♙", color: "white", position: "a2" },
  { id: "pawn2-white", type: "♙", color: "white", position: "b2" },
  { id: "pawn3-white", type: "♙", color: "white", position: "c2" },
  { id: "pawn4-white", type: "♙", color: "white", position: "d2" },
  { id: "pawn5-white", type: "♙", color: "white", position: "e2" },
  { id: "pawn6-white", type: "♙", color: "white", position: "f2" },
  { id: "pawn7-white", type: "♙", color: "white", position: "g2" },
  { id: "pawn8-white", type: "♙", color: "white", position: "h2" },
];

const Chessboard = () => {
  const [pieces, setPieces] = React.useState(initialPieces);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPieces((pieces) => {
        const oldIndex = pieces.findIndex((piece) => piece.id === active.id);
        const newIndex = pieces.findIndex((piece) => piece.id === over.id);

        return arrayMove(pieces, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={pieces} strategy={horizontalListSortingStrategy}>
        <div className="chessboard">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div key={row} className="row">
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((col) => (
                <div key={col} className="square">
                  {pieces.map(
                    (piece) =>
                      piece.position === `${col}${row}` && (
                        <Piece
                          key={piece.id}
                          id={piece.id}
                          type={piece.type}
                          color={piece.color}
                        />
                      )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Chessboard;

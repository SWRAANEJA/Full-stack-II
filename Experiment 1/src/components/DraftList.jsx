import React from "react";

function DraftList({ drafts, onEdit, onDelete }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        drafts.map((draft) => (
          <div
            key={draft.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Platform:</strong> {draft.platform}</p>

            <p><strong>Content:</strong></p>

            <p>{draft.content}</p>

            <p><strong>Created:</strong> {draft.date}</p>

            <button
              onClick={() => onEdit(draft)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(draft.id)}
            >
              Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default DraftList;
import React, { useState, useEffect } from "react";
import DraftList from "./DraftList";
import validationStrategies from "../utils/validation";
import { toast } from "react-toastify";
import { saveDraftAPI } from "../utils/mockApi";
import { retry } from "../utils/retry";

function PostComposer() {
    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState("Twitter");
    const [drafts, setDrafts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const limits = {
        Twitter: 280,
        LinkedIn: 3000,
        Instagram: 2200,
    };

    const isValid = validationStrategies[platform](content);

    // Prevent saving empty drafts before loading
    const [isLoaded, setIsLoaded] = useState(false);

    // Load drafts from localStorage
    useEffect(() => {
        const savedDrafts = localStorage.getItem("drafts");

        if (savedDrafts) {
            setDrafts(JSON.parse(savedDrafts));
        }

        setIsLoaded(true);
    }, []);

    // Save drafts only after loading is complete
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("drafts", JSON.stringify(drafts));
        }
    }, [drafts, isLoaded]);

    // Save or Update Draft
    const saveDraft = async () => {
        if (content.trim() === "") {
            toast.error("Post cannot be empty!");
            return;
        }

        setLoading(true);

        try {
            const draft = {
                id: editingId || Date.now(),
                platform,
                content,
                date: new Date().toLocaleString(),
            };

            // Mock API with retry
            await retry(() => saveDraftAPI(draft));

            if (editingId) {
                setDrafts((prevDrafts) =>
                    prevDrafts.map((d) =>
                        d.id === editingId ? draft : d
                    )
                );

                toast.success("Draft Updated Successfully!");
                setEditingId(null);
            } else {
                setDrafts((prevDrafts) => [...prevDrafts, draft]);

                toast.success("Draft Saved Successfully!");
            }

            setContent("");
            setPlatform("Twitter");
        } catch (error) {
            toast.error("API Failed after 3 retries!");
        } finally {
            setLoading(false);
        }
    };

    // Edit Draft
    const editDraft = (draft) => {
        setContent(draft.content);
        setPlatform(draft.platform);
        setEditingId(draft.id);
    };

    // Delete Draft
    const deleteDraft = (id) => {
        setDrafts((prevDrafts) =>
            prevDrafts.filter((draft) => draft.id !== id)
        );

        toast.success("Draft Deleted Successfully!");
    };

    return (
        <div>
            <h1>Post Composer</h1>

            <label>
                <strong>Select Platform</strong>
            </label>

            <br />
            <br />

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
            </select>

            <br />
            <br />

            <textarea
                rows="8"
                cols="70"
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <br />

            <p>
                <strong>Platform:</strong> {platform}
            </p>

            <p>
                <strong>Characters:</strong> {content.length} / {limits[platform]}
            </p>

            {!isValid && (
                <p
                    style={{
                        color: "red",
                        fontWeight: "bold",
                    }}
                >
                    Character limit exceeded for {platform}!
                </p>
            )}

            <button
                onClick={saveDraft}
                disabled={!isValid || loading}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                {loading
                    ? "Saving..."
                    : editingId
                        ? "Update Draft"
                        : "Save Draft"}
            </button>

            <DraftList
                drafts={drafts}
                onEdit={editDraft}
                onDelete={deleteDraft}
            />
        </div>
    );
}

export default PostComposer;
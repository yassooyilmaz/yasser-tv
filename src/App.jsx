import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const getYouTubeId = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1].split("/")[0];
    }

    return parsedUrl.searchParams.get("v");
  } catch {
    return "";
  }
};

  const menuItems = [
    { id: "home", name: "Home", icon: "🏠" },
    { id: "youtube", name: "YouTube", icon: "▶️" },
    { id: "videos", name: "My Videos", icon: "🎬" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  const selectVideo = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const newVideoUrl = URL.createObjectURL(file);
    setVideoUrl(newVideoUrl);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">YASSER TV</div>
        <div className="status">● Ready</div>
      </header>

      <main className="content">
        {activeTab === "home" && (
          <section className="home">
            <h1>Welcome to Yasser TV</h1>
            <p>Video entertainment for your car</p>

            <div className="cards">
              <button onClick={() => setActiveTab("youtube")}>
                <span>▶️</span>
                <strong>YouTube</strong>
                <small>Watch YouTube videos</small>
              </button>

              <button onClick={() => setActiveTab("videos")}>
                <span>🎬</span>
                <strong>My Videos</strong>
                <small>Play your videos</small>
              </button>

              <button onClick={() => setActiveTab("settings")}>
                <span>⚙️</span>
                <strong>Settings</strong>
                <small>Yasser TV settings</small>
              </button>
            </div>
          </section>
        )}

        {activeTab === "youtube" && (
          <section className="page">
            <h1>▶️ YouTube</h1>
           <div style={{ width: "100%", maxWidth: "900px", margin: "20px auto" }}>
  <input
    type="text"value={youtubeUrl}
onChange={(e) => setYoutubeUrl(e.target.value)}
    placeholder="Paste YouTube video link here"
    style={{
      width: "100%",
      padding: "15px",
      fontSize: "18px",
      borderRadius: "10px",
      boxSizing: "border-box",
    }}
  />
  <button
  onClick={() => {
  const id = getYouTubeId(youtubeUrl);
  if (id) {
    setYoutubeVideoId(id);
  }
}}
  style={{
    marginTop: "15px",
    padding: "15px 25px",
    fontSize: "18px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  ▶ Play YouTube
</button>
{youtubeVideoId && (
  <iframe
    width="100%"
    height="400"
    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{
      marginTop: "20px",
      border: "none",
      borderRadius: "12px",
    }}
  ></iframe>
)}
</div>

            <button className="back" onClick={() => setActiveTab("home")}>
              ← Back
            </button>
          </section>
        )}

        {activeTab === "videos" && (
          <section className="page">
            <h1>🎬 My Videos</h1>
            <p>Select a video from your device.</p>

            <input
              type="file"
              accept="video/*"
              onChange={selectVideo}
            />

            {videoUrl && (
              <video
                src={videoUrl}
                controls
                autoPlay
                muted={false}
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  marginTop: "20px",
                }}
              />
            )}

            <button className="back" onClick={() => setActiveTab("home")}>
              ← Back
            </button>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="page">
            <h1>⚙️ Settings</h1>
            <p>Yasser TV settings.</p>
  
            <button className="back" onClick={() => setActiveTab("home")}>
              ← Back
            </button>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={activeTab === item.id ? "active" : ""}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
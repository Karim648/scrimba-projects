import aiPlaceholder from "../assets/ai-photo.png"

export function Header() {
    return (
        <header>
            <img src={aiPlaceholder}  alt="ai generated photo of a placeholder for business card" />
            <h1>John Doe</h1>
            <h2>Full Stack Developer</h2>
            <h3>JohnDoe.website</h3>
            <div>
                <button id="email">✉️ Email</button>
                <button id="linkedIn">🌐 LinkedIn</button>
            </div>
        </header>
    );
}
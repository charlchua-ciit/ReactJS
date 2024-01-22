import './Site.css'

function Header() {
    return <h1>Header</h1>;
  }

function Navbar(){
    return <div>
        <ul>
            <li><a href="default.asp">Home</a></li>
            <li><a href="news.asp">News</a></li>
            <li><a href="contact.asp">Contact</a></li>
            <li><a href="about.asp">About</a></li>
        </ul>
    </div>
}

function Content(){
    return <div>
        <p>This is the content section of this website. Insert a bunch of words and filler text here. Lorem ipsum and all that jazz.</p>
    </div>
}

export {Header, Navbar, Content};

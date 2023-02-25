import './article-view.css'

function ArticleView(props) {
    return (
        <section id="article-view">
            {props.article.title ? <h1>{props.article.title}</h1> : <h1>Select an article</h1>}
            {props.article.text ? <p>{props.article.text}</p> : <p></p>}
        </section>
    )
}

export default ArticleView
import './article-link.css'

function ArticleLink(props) {
    const selectArticle = (e) => {
        props.setNewArticle(e.target.value)
    }

    return (
        <li className='link-li' >
            <button className="article-link" 
                value={props.article.id} 
                onClick={selectArticle}
                key={props.key}>
                    {props.article.title}
            </button>
        </li>
    )
}

export default ArticleLink
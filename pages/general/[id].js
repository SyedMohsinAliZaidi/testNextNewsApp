import { useRouter } from 'next/router';
import styles from '../../styles/News.module.css'
export const General = ({ pageNumber, articles }) => {
    const router = useRouter();
    let category = router.pathname.split('/')
    category = category[category.length - 2]
    return (
        <div className='page-container'>
            <div className={styles.main}>
                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} />}
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/${category}/${pageNumber - 1}`)
                        }
                    }}
                    className={pageNumber === 1 ? styles.disabled : styles.active}
                >
                    previous
                    </div>
                <div>#{pageNumber}</div>
                <div
                    onClick={() => {
                        if (pageNumber < 5) {
                            router.push(`/${category}/${pageNumber + 1}`)
                        }
                    }}
                    className={pageNumber === 5 ? styles.disabled : styles.active}
                >
                    Next
                    </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id;
    console.log(pageContext.resolvedUrl.split('/'), 'acs===============')
    let category = pageContext.resolvedUrl.split('/')
    category = category[category.length - 2]
    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=${category}&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PUBLIC_NEWS_API_KEY}`
            }
        }
    )

    const apiJson = await apiResponse.json()


    const { articles } = apiJson;

    return {
        props: {
            articles,
            pageNumber: +pageNumber
        }
    }
}

export default General;
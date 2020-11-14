import React from "react"
import ArticleService from "components/Article/article.service"
import {db} from "components/Article/article.service"

export const useGetArticles = () => {
    const [values , setValues] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true);
        const listener = ArticleService.getAll().on("value" , (snapshot) => {
            setValues(snapshot.val());
            setLoading(false);
        });
        return () => {
            ArticleService.getAll().off("value" , listener);
        }
    }, []);
    return { values , loading }
}
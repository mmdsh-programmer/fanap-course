import React from "react"
import { db } from "components/Article/article.service"

export const useGetArticles = () => {
    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true);
        const listener = db.on("value", function (snapshot) {
            setArticles(snapshot.val() !== null ? Object.values(snapshot.val()) : []);
            setLoading(false);
        }, function (errorObject) {
            console.log("Could not read data!")
        });
        return () => {
            db.off("value", listener)
        }
    }, []);
    return { articles, loading }
}
import React from "react"
import { ArticleService } from "components/Article";
import { toast } from "react-toastify";
import { storage, db } from "services/firebase"
export function useAddArticle(article, image, action, selectedArticle) {
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        async function run() {
            if (article && image) {
                setLoading(true)
                const key = db.ref().child(article.uid).push().key
                const img = storage.ref("/images").child(action === "update" ? selectedArticle.prop.key : key);
                image && await img.put(image);
                const url = await img.getDownloadURL();
                const { title, body, uid, name } = article;
                if (action === "create") {
                    const finalData = {
                        title: title,
                        body: body,
                        uid: uid,
                        datePublished: Date.now(),
                        key: key,
                        image: url,
                        name: name
                    }
                    ArticleService.create(finalData)
                        .then(() => toast.success("Article was successfully added"))
                        .catch(error => toast.error(error))
                        .finally(() => setLoading(false));
                } else if (action === "update") {
                    const finalData = {
                        title: title,
                        body: body,
                        image: url,
                    }
                    ArticleService.update(selectedArticle.key, finalData)
                        .then(() => toast.success("Article was successfully edited"))
                        .catch(error => toast.error(error.message))
                        .finally(() => setLoading(false));
                }
            }
        }
        run();
    }, [article])
    return { loading }
}
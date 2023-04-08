import { FC } from "react"
import { Paginate } from "./TableData"

interface SlicedPages {
    pages: Pick<Paginate, 'slicedPages'>
    index: Pick<Paginate, 'index'>
}

const SlicedPages:FC<SlicedPages> = ({ pages, index }) => {
    const page = pages[index]

    // Return early if page is undefined or empty
    if (!page || !page.length) {
        return null
    }

    return (
        <>
            {page.map(({ data: { id, user } }) =>
                user.map((name, i) => <User key={`${id}-${i}`} name={name} />)
            )}
        </>
    )
}

export default SlicedPages
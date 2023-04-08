import { FC } from 'react'
import { Paginate } from './TableData'

interface SlicedPages {
    pages: any[][] | null
    index: number
}

const SlicedPages: FC<SlicedPages> = ({ pages, index }) => {
    // Return early if page is undefined or empty
    if (!pages || !pages.length) {
        return null
    }
    const page = pages[index]

    const TableItem = ({ name }: any) => {
        return <p>{name}</p>
    }

    return (
        <>
            {page.map(({ data: { id, user } }) =>
                user.map((name, i) => (
                    <TableItem key={`${id}-${i}`} name={name} />
                ))
            )}
        </>
    )
}

export default SlicedPages

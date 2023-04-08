import { FC } from 'react'

interface SlicedPages {
    pages: any[][] | null
    index: number
}

const SlicedPages: FC<SlicedPages> = ({ pages, index }) => {
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
                user.map((item: any, i: number) => (
                    <TableItem key={`${id}-${i}`} name={item} />
                ))
            )}
        </>
    )
}

export default SlicedPages

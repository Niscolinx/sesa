import { FC } from 'react'

interface SlicedPages {
    pages: any[][] | null
    index: number
}

const SlicedPages: FC<SlicedPages> = ({ pages, index }) => {
    console.log(pages)

    if (!pages || !pages.length) {
        return null
    }
    const page = pages[index]

    const TableItem = ({ name }: any) => {
        return <p>{name}</p>
    }

    const dataToDisplay = [
        'phone',
        'gender',
        'name',
        'created_at',
        'status',
        'image',
    ]
    return (
        <>
            {page.map(({ id, user }: any) =>
                Object.entries(user).map(([key, value]: any, i: number) => (
                   dataToDisplay.includes(key) && <TableItem key={`${id}-${i}`} name={value} />
                ))
            )}
        </>
    )
}

export default SlicedPages

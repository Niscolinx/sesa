export const getPhotoUrl = async(selector: string) => {
    const selectPhoto = document.querySelector(selector)

    if (!selectPhoto) return 'no photo selected'

    const photo = selectPhoto as HTMLInputElement

    const photoUrl:string = await new Promise((resolve, reject) => {
        photo.addEventListener('change', (e) => {
            const file = e.target as HTMLInputElement

            const reader = new FileReader()

            reader.readAsDataURL(file.files![0])

            reader.onload = () => resolve(reader.result as string)

            reader.onerror = (err) => reject(err)
        })
    })
    return photoUrl
}

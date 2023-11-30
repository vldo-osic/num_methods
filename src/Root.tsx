import { AppPreview } from "./components/AppPreview"

const preview: AppPreview[] = [
    {
        title: 'Матрицы',
        description: 'Нахождение решения матриц различными методами',
        img: 'src/resources/matrix.png',
        link: 'matrix/'
    },
    {
        title: 'Численные методы решения нелинейных уравнений.',
        description: 'Нахождение решения нелинейного уравнения с разной точностью и построение графика',
        img: 'src/resources/num-methods.png',
        link: 'methods/'
    }
]
export const Root = () => {

    return (
        <div className="main-page">
            {
                preview.map(
                    (app, index) => <AppPreview title={app.title}
                                       description={app.description}
                                       img={app.img}
                                       link={app.link}
                                       key={index}/>
                )
            }
        </div>
    )
}
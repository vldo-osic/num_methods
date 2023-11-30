import { FC } from 'react'
import { Link } from 'react-router-dom'


export interface AppPreview {
    title: string,
    description: string,
    img: string,
    link: string,
}
export const AppPreview:FC<AppPreview> = ({title, description, img, link }) => {
    
    return (
        <div className='app-preview'>
            <h2 className='app-preview__title'>{title}</h2>
            <Link className='app-preview__link' to={link}>
                <img src={img} alt={title} width={400} height={400}/>
            </Link>
            <h3 className='app-preview__description'>{description}</h3>
        </div>
        
    )
}

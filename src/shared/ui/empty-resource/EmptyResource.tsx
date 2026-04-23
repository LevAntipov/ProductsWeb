import classes from './EmptyResource.module.css'
interface EmptyResourceProps{
    text:string
}
export const EmptyResource = ({text}:EmptyResourceProps) => {
    return(
        <div className={classes.container}>
            <span>{text}</span>
        </div>
    )
}
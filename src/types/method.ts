type TMethods = {
    currentFunction?: TFunction
    currentMethod?: TMethodCard
    children: TMethodCard[]
}

type TMethodCard = {
    title: string

}

type TFunction = {
    function: string
}
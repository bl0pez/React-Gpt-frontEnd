import styled from './TypingLoader.module.css'

interface Props {
    className?: string
    }

export const TypingLoader = ({ className }: Props) => {
  return (
    <div className={`${styled.typing} ${className}`}>
        <span className={`${styled.circle} ${styled.scaling}`}></span>
        <span className={`${styled.circle} ${styled.scaling}`}></span>
        <span className={`${styled.circle} ${styled.scaling}`}></span>
    </div>
  )
}

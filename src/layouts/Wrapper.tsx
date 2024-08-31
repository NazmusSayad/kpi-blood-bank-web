import { ComponentProps } from 'react'

export default function Wrapper(props: Props) {
  return (
    <div
      {...props}
      className={tw('max-w-[90rem] w-full mx-auto px-[3%]', props.className)}
    />
  )
}

type Props = ComponentProps<'div'>

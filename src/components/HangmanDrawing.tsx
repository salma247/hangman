
const HEAD = <div className='man-head'/>
const BODY = <div className='man-body'/>
const RIGHTARM = <div className='man-rightarm'/>
const LEFTARM = <div className='man-leftarm'/>
const RIGHTLEG = <div className='man-rightleg'/>
const LEFTLEG = <div className='man-leftleg'/>

const BODY_PARTS = [HEAD, BODY, RIGHTARM, LEFTARM, RIGHTLEG, LEFTLEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
}

export default function HangmanDrawing({numberOfGuesses} : HangmanDrawingProps) {
  return (
    <div className='hangman-drawing'>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className='bar-hang'/>
      <div className='bar-top'/>
      <div className='bar-middle'/>
      <div className='bar-bottom'/>
    </div>
  )
}

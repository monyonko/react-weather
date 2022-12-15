import AnimatedText from 'react-animated-text-content';

export default function AnimatedHeaderText(props){
    console.log(props.data)
    return(
        <AnimatedText
    type="chars" // animate words or chars
    animation={{
        x: '0px',
        y: '0px',
        scale: 1.1,
        ease: 'ease-in-out',
    }}
    animationType="slide"
    interval={0.06}
    duration={0.4}
    tag="p"
    className="animated-paragraph"
    includeWhiteSpaces
    threshold={0.1}
    rootMargin="20%"
    >
    {props.data}
    </AnimatedText>
    )
}

    
    
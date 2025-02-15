import React, { useState } from 'react';
import { 
    Container, 
    TranscriptContainer, 
    MessageBubble, 
    RatingContainer, 
    StarButton 
} from '../styles/StyledComponents';

const Review = ({ transcript }) => {
    const [rating, setRating] = useState(5);

    return (
        <Container>
            <h2>Review</h2>
            <TranscriptContainer>
                {transcript.map((message, index) => (
                    <MessageBubble key={index} speaker={message.speaker}>
                        {message.text}
                    </MessageBubble>
                ))}
            </TranscriptContainer>
            <h3>Rate this conversation:</h3>
            <RatingContainer>
                {[1, 2, 3, 4, 5].map((value) => (
                    <StarButton
                        key={value}
                        active={value <= rating}
                        onClick={() => setRating(value)}
                    >
                        ★
                    </StarButton>
                ))}
            </RatingContainer>
            <p>Thank you for your feedback!</p>
        </Container>
    );
};

export default Review;
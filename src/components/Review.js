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
    const [comments, setComments] = useState('');

    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };

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
            <h3>Comments and Suggestions:</h3>
            <textarea 
                value={comments} 
                onChange={handleCommentChange} 
                placeholder="Leave your comments here..."
                rows="4"
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <p>Thank you for your feedback!</p>
        </Container>
    );
};

export default Review;
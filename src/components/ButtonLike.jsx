import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Label, Icon, Popup } from 'semantic-ui-react';
import { LIKE_POST_MUTATION } from '../util/graphql';

const LikeBtn = ({ user, post: { id, likeCount, likes } }) => {
	const [liked, setLiked] = useState(false);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [likes, user]);

	const likeButton = user ? (
		liked ? (
			<Button onClick={likePost} color='teal'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button onClick={likePost} color='teal' basic>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='teal' basic>
			<Icon name='heart' />
		</Button>
	);

	return (
		<Button as='div' labelPosition='right'>
			<Popup content='Like post' trigger={likeButton} inverted />

			<Label as='a' basic color='teal' pointing='left'>
				{likeCount}
			</Label>
		</Button>
	);
};

export default LikeBtn;

import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../../components/iconify';
import BlogPostCard from '../../components/blog/postcard';
import { getPosts } from './get-posts';
import { useLanguageStore } from '../../store/language-store';

export default function BlogPage() {
  const { lang } = useLanguageStore();
  const posts = getPosts(lang);
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

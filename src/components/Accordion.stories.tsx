import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import type { Meta, StoryFn } from '@storybook/react';

type ComponentType = typeof MuiAccordion;

export default {
  title: 'Components / Accordion',
  component: MuiAccordion,
} as Meta;

export const Accordion: StoryFn<ComponentType> = () => (
  <MuiAccordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary', height: '32px', width: '32px' }} />}
      aria-controls="agregates-content"
    >
      <Grid container spacing={4}>
        <Grid item xs={1}>
          <Typography fontSize="16px" fontWeight="bold">
            Agregat 1
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column">
            <Typography color="text.secondary" fontSize="12px">
              Udział procent. wzgl. pow. użytkowej
            </Typography>
            <Typography fontSize="14px" fontWeight="bold">
              45%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column">
            <Typography color="text.secondary" fontSize="12px">
              Średni poziom zużycia w budynkach [kwh/m²/rok]
            </Typography>
            <Box display="flex" gap="20px">
              <Typography color="text.secondary" fontSize="12px">
                Energia elektr.{' '}
                <Typography component="span" fontSize="14px" fontWeight="bold" color="text.primary">
                  75
                </Typography>
              </Typography>
              <Typography color="text.secondary" fontSize="12px">
                Ciepło{' '}
                <Typography component="span" fontSize="14px" fontWeight="bold" color="text.primary">
                  15
                </Typography>
              </Typography>
              <Typography color="text.secondary" fontSize="12px">
                Chłód{' '}
                <Typography component="span" fontSize="14px" fontWeight="bold" color="text.primary">
                  10
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" flexDirection="column">
            <Typography color="text.secondary" fontSize="12px">
              Powierzchnia całkowita
            </Typography>
            <Typography fontSize="14px" fontWeight="bold">
              659 000,19 m²
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" flexDirection="column">
            <Typography color="text.secondary" fontSize="12px">
              Liczba budynków
            </Typography>
            <Typography fontSize="14px" fontWeight="bold">
              968 452,00
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vestibulum mattis ullamcorper
        velit sed ullamcorper. Ultrices dui sapien eget mi proin sed libero. Porttitor leo a diam sollicitudin tempor id
        eu nisl nunc. Id velit ut tortor pretium viverra suspendisse. Eget lorem dolor sed viverra ipsum nunc. Orci ac
        auctor augue mauris augue neque. Tellus rutrum tellus pellentesque eu tincidunt tortor. Amet massa vitae tortor
        condimentum lacinia. Velit dignissim sodales ut eu sem. Vel fringilla est ullamcorper eget nulla. Tempor orci
        dapibus ultrices in iaculis nunc. Dictum varius duis at consectetur lorem donec. Ac turpis egestas sed tempus
        urna et pharetra. Eget sit amet tellus cras adipiscing. Lacus vestibulum sed arcu non odio. Lacinia at quis
        risus sed. Nibh praesent tristique magna sit amet purus. Sem integer vitae justo eget magna fermentum.
        Suspendisse in est ante in nibh mauris cursus mattis. Sit amet nulla facilisi morbi tempus iaculis urna id
        volutpat. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Urna cursus eget nunc scelerisque viverra
        mauris in. Id volutpat lacus laoreet non curabitur gravida. Aliquam vestibulum morbi blandit cursus risus at
        ultrices mi tempus. Eget lorem dolor sed viverra ipsum. Aliquam vestibulum morbi blandit cursus. Pulvinar mattis
        nunc sed blandit. Nulla facilisi morbi tempus iaculis urna id volutpat. Sit amet consectetur adipiscing elit
        duis tristique sollicitudin nibh. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur.
        Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Neque aliquam vestibulum morbi blandit cursus risus
        at ultrices mi. Ac turpis egestas sed tempus urna et pharetra. Netus et malesuada fames ac turpis egestas sed
        tempus urna. Cras ornare arcu dui vivamus arcu felis bibendum ut. Risus nullam eget felis eget. Et malesuada
        fames ac turpis egestas maecenas pharetra convallis posuere. Habitant morbi tristique senectus et netus et
        malesuada. Eget velit aliquet sagittis id consectetur purus. Eros donec ac odio tempor orci dapibus ultrices in
        iaculis. Montes nascetur ridiculus mus mauris vitae ultricies leo. Ullamcorper a lacus vestibulum sed. Tempor
        commodo ullamcorper a lacus. Maecenas accumsan lacus vel facilisis volutpat. Mi sit amet mauris commodo quis
        imperdiet massa. Vitae tortor condimentum lacinia quis vel. Quam adipiscing vitae proin sagittis nisl rhoncus
        mattis rhoncus urna. Quam quisque id diam vel. In ante metus dictum at tempor commodo. Nulla facilisi etiam
        dignissim diam quis enim lobortis scelerisque fermentum. Mi in nulla posuere sollicitudin aliquam ultrices
        sagittis. Donec et odio pellentesque diam. Consectetur lorem donec massa sapien faucibus et molestie. Fames ac
        turpis egestas integer eget aliquet nibh praesent tristique. Turpis cursus in hac habitasse platea dictumst
        quisque sagittis. Pellentesque elit eget gravida cum sociis natoque. Felis eget nunc lobortis mattis aliquam
        faucibus purus in. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Sapien faucibus et
        molestie ac feugiat sed. In vitae turpis massa sed elementum tempus egestas. Amet nulla facilisi morbi tempus
        iaculis urna. Ullamcorper sit amet risus nullam eget felis eget. Donec massa sapien faucibus et molestie. Neque
        aliquam vestibulum morbi blandit cursus risus at. Scelerisque eleifend donec pretium vulputate. Massa vitae
        tortor condimentum lacinia quis vel. Ultrices vitae auctor eu augue ut. Risus commodo viverra maecenas accumsan
        lacus vel facilisis. Congue eu consequat ac felis donec et. Lacus vel facilisis volutpat est velit egestas dui
        id. Purus viverra accumsan in nisl nisi scelerisque eu ultrices.
      </Typography>
    </AccordionDetails>
  </MuiAccordion>
);

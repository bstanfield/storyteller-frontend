import { Player } from "../types";

export const MIN_PLAYER_COUNT = 3;
export const MAX_PLAYER_COUNT = 6;

export const TESTING_IMAGES = [
  'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
  'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
  'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
  'Lisawesa_A_child_in_a_white_spacesuitintricate_detailshttpswww._af68f8f1-e2d7-43b1-b601-d481c605fc7a.png',
  'Lyra_the_unstoppable_flow_of_sloth_VS_the_unstoppable_flow_of_t_a0359061-4827-4c8e-8627-a9ddad65dc8e.png',
  'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png',
  'Dinsdale__surreal_a8afacd7-c281-44bd-b77d-4ebdd860998c.png',
  'davidiskray_colorful_space_organic_spaceships_fantasy_space_sta_71d286a7-37c5-43e2-ae37-d3e7e0c7c138.png',
  'BrandonMc_A_medieval_anthropomorphic_ragdoll_calico_cat_wizard__e50274ac-cd5c-41d5-b6bf-51e37567dd21.png',
]

export const TESTING_SAMPLE_HAND = TESTING_IMAGES.slice(0, 6);

export const TESTING_INVITEES: Partial<Player>[] = [
  {
    avatarUrl: 'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
    username: 'ben',
    state: 'choosing',
  },
  {
    avatarUrl: 'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
    username: 'scott',
    state: 'guessing',
  },
  {
    avatarUrl: 'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
    username: 'cyndi',
    state: 'done',
  },
];

export const TESTING_STORYTELLER = TESTING_INVITEES[0];

export const CARD_WIDTHS = [160, 160, 180, 200];
export const SMALL_CARD_WIDTHS = [140, 150, 170, 190];
export const LIGHTBOX_CARD_WIDTHS = [160, 200, 260, 300];


export const TESTING_VOTING_HAND = [
  {
    id: 1,
    imgixPath: 'Lisawesa_A_child_in_a_white_spacesuitintricate_detailshttpswww._af68f8f1-e2d7-43b1-b601-d481c605fc7a.png',
    owner: TESTING_INVITEES[0],
    voters: [TESTING_INVITEES[1], TESTING_INVITEES[2]],
    isStoryteller: true,
  }, 
  {
    id: 2,
    imgixPath: 'davidiskray_colorful_space_organic_spaceships_fantasy_space_sta_71d286a7-37c5-43e2-ae37-d3e7e0c7c138.png',
    owner: TESTING_INVITEES[1],
    voters: [],
    isStoryteller: false,
  }, 
  {
    id: 3,
    imgixPath: 'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png',
    owner: TESTING_INVITEES[1],
    voters: [],
    isStoryteller: false,
  }, 
  {
    id: 4,
    imgixPath: 'BrandonMc_A_medieval_anthropomorphic_ragdoll_calico_cat_wizard__e50274ac-cd5c-41d5-b6bf-51e37567dd21.png',
    owner: TESTING_INVITEES[2],
    voters: [],
    isStoryteller: false,
  }, 
  {
    id: 5,
    imgixPath: 'Lyra_the_unstoppable_flow_of_sloth_VS_the_unstoppable_flow_of_t_a0359061-4827-4c8e-8627-a9ddad65dc8e.png',
    owner: TESTING_INVITEES[2],
    voters: [],
    isStoryteller: false,
  },
]
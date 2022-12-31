import { PlayerType } from '../types'

export const MIN_PLAYER_COUNT = 3
export const MAX_PLAYER_COUNT = 6

export const TESTING_IMAGES = [
  'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
  'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
  'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
  'Lisawesa_A_child_in_a_white_spacesuitintricate_detailshttpswww._af68f8f1-e2d7-43b1-b601-d481c605fc7a.png',
  'Lyra_the_unstoppable_flow_of_sloth_VS_the_unstoppable_flow_of_t_a0359061-4827-4c8e-8627-a9ddad65dc8e.png',
  'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png',
  'Dinsdale__surreal_a8afacd7-c281-44bd-b77d-4ebdd860998c.png',
  'davidiskray_colorful_space_organic_spaceships_fantasy_space_sta_71d286a7-37c5-43e2-ae37-d3e7e0c7c138.png',
  'BrandonMc_A_medieval_anthropomorphic_ragdoll_calico_cat_wizard__e50274ac-cd5c-41d5-b6bf-51e37567dd21.png'
]

export const TESTING_SAMPLE_HAND = [
  {
    id: 83,
    imgixPath:
      'pickersberry_a_shakespeare_stage_play_yellow_mist_…pheric_s_ba0547e4-b101-4022-a7e5-757ce64f2f50.png'
  },
  {
    id: 64,
    imgixPath:
      'ajohnsonbarroso_giant_house_cat_rising_from_the_se…tasy_col_240c3472-89e4-499b-9582-aa3f01d3b2df.png'
  },
  {
    id: 87,
    imgixPath:
      'rrteam_frozen_heaven_abstract_undertones_intricate…ils_beau_96c26598-524c-4dc8-8d49-92e93abcccb8.png'
  },
  {
    id: 53,
    imgixPath:
      'SirKyleQ_a_cinematic_wide_shot_in_a_wes_anderson_f…f_a_cybo_a84cb358-30c4-4493-849a-bb01dc942b4e.png'
  },
  {
    id: 29,
    imgixPath:
      'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png'
  },
  {
    id: 7,
    imgixPath:
      'Bluejay_Jesus_has_flame_sacred_heart_painting_by_M…l_Parkes_d17f16e9-b2b9-4656-ba45-683fe296eed9.png'
  },
  {
    id: 56,
    imgixPath:
      'Suspect_Jesse_pie_overgrown_magical_forest_owl_wol…James_Je_072700af-22c8-454d-bb3c-55f344443dd8.png'
  }
]

export const TESTING_INVITEES: Partial<PlayerType>[] = [
  {
    avatarUrl:
      'zast_turtle_ninja_Baby_full_body_in_action_epic_scene_cinematic_3da00e06-aab3-48e0-982c-9e4a14a4a5f9.png',
    username: 'ben',
    state: 'choosing'
  },
  {
    avatarUrl:
      'TenderlySharp_Pixel_art_is_too_good_for_you_e345c77c-abf1-4d46-acb7-be9e56d6ea88.png',
    username: 'scott',
    state: 'guessing'
  },
  {
    avatarUrl: 'karurosu_bread_75a51dfc-f9ca-448e-9485-843629e37a6b.png',
    username: 'cyndi',
    state: 'done'
  }
]

export const TESTING_STORYTELLER = TESTING_INVITEES[0]

export const CARD_WIDTHS = [160, 160, 180, 200]
export const JUMBO_CARD_WIDTHS = [180, 200, 260, 320]
export const SMALL_CARD_WIDTHS = [140, 150, 170, 190]
export const LIGHTBOX_CARD_WIDTHS = [160, 200, 260, 300]

export const TESTING_VOTING_HAND = [
  {
    id: 1,
    imgixPath:
      'Lisawesa_A_child_in_a_white_spacesuitintricate_detailshttpswww._af68f8f1-e2d7-43b1-b601-d481c605fc7a.png',
    owner: TESTING_INVITEES[0],
    voters: [TESTING_INVITEES[1], TESTING_INVITEES[2]],
    isStoryteller: true
  },
  {
    id: 2,
    imgixPath:
      'davidiskray_colorful_space_organic_spaceships_fantasy_space_sta_71d286a7-37c5-43e2-ae37-d3e7e0c7c138.png',
    owner: TESTING_INVITEES[1],
    voters: [],
    isStoryteller: false
  },
  {
    id: 3,
    imgixPath:
      'Joseph_Is_Great_pixel_art_harbor_by_a_small_town_at_sunset_cada5b57-24db-40f7-92c7-72d7df5a3cdc.png',
    owner: TESTING_INVITEES[1],
    voters: [TESTING_INVITEES[2]],
    isStoryteller: false
  },
  {
    id: 4,
    imgixPath:
      'BrandonMc_A_medieval_anthropomorphic_ragdoll_calico_cat_wizard__e50274ac-cd5c-41d5-b6bf-51e37567dd21.png',
    owner: TESTING_INVITEES[2],
    voters: [],
    isStoryteller: false
  },
  {
    id: 5,
    imgixPath:
      'Lyra_the_unstoppable_flow_of_sloth_VS_the_unstoppable_flow_of_t_a0359061-4827-4c8e-8627-a9ddad65dc8e.png',
    owner: TESTING_INVITEES[2],
    voters: [],
    isStoryteller: false
  }
]

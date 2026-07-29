import {
  COMPACT_ACTION_BUTTON_STYLE,
  COMPACT_ACTION_FOCUS_STYLE,
  COMPACT_ACTION_HOVER_STYLE,
  COMPACT_ACTION_MUTED_STYLE,
  CONTENT_MORE_ACTIVE_STYLE,
  CONTENT_MORE_STYLE,
  FOLLOWING_BUTTON_DANGER_STYLE,
  FOLLOWING_BUTTON_STYLE,
  OUTLINED_PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_HOVER_STYLE,
  PRIMARY_BUTTON_STYLE,
} from "../shared/actions.js";
import { HOT_SEARCH_TAG_LAYOUT_STYLE } from "../shared/content.js";

export const CROSS_PAGE_CONTROLS_STYLE = `
  html[data-zb-theme] body .Button.FollowButton.Button--blue {${PRIMARY_BUTTON_STYLE}
  }

  html[data-zb-theme]
    body
    .Button.FollowButton.Button--blue:hover {${PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme] body .Button.FollowButton.Button--grey {${FOLLOWING_BUTTON_STYLE}
  }

  html[data-zb-theme]
    body
    .Button.FollowButton.Button--grey:is(:hover, :focus-visible) {${FOLLOWING_BUTTON_DANGER_STYLE}
    outline: 0 !important;
  }

  html[data-zb-theme]
    body
    .Button.FollowButton.Button--grey:focus-visible {
    box-shadow: 0 0 0 2px var(--zb-danger-soft) !important;
  }

  html[data-zb-theme] .QuestionHeader .WriteAnswerButton:hover,
  html[data-zb-theme]
    .PageHeader
    .QuestionButtonGroup
    .WriteAnswerButton:hover,
  html[data-zb-theme]
    [data-zb-hover-card]
    .HoverCard-buttons
    .Button:not(.FollowButton):is(:hover, :focus-visible),
  html[data-zb-theme]
    .Question-sideColumn
    .AnswerAuthor-buttons
    .Button:not(.FollowButton):hover,
  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    :is(
      a[href="/creator"],
      a[href="/question/waiting"],
      a[href="/consult"],
      a[href="/education/learning"],
      .KfeCollection-CreateSaltCard-button
    ):is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileHeader-buttons
    .FollowButton
    + .Button:hover,
  html[data-zb-theme][data-zb-profile-page="true"]
    .Profile-sideColumn
    :is(a[href="/creator"], a[href="/question/waiting"]):is(
      :hover,
      :focus-visible
    ),
  html[data-zb-theme][data-zb-question-page="true"]
    .QuestionInvitation
    .AutoInviteItem-wrapper--desktop
    .ContentItem-extra
    .AutoInviteItem-button--closed.Button.Button--link:is(
      :hover,
      :focus-visible
    ) {${OUTLINED_PRIMARY_BUTTON_HOVER_STYLE}
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton),
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme]:where([data-zb-search-page="true"])
    .HotLanding
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton) {${COMPACT_ACTION_BUTTON_STYLE}
  }

  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton),
  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme]
    .PinDetail
    .PinItem
    .ContentItem-actions
    .Button:not(.VoteButton),
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton) {${COMPACT_ACTION_MUTED_STYLE}
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):hover,
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):hover,
  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton):hover,
  html[data-zb-theme]:where([data-zb-search-page="true"])
    .HotLanding
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover,
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):hover,
  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    .ContentItem-actions
    .Button:not(.VoteButton):hover,
  html[data-zb-theme]
    .PinDetail
    .PinItem
    .ContentItem-actions
    .Button:not(.VoteButton):hover,
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton):hover {${COMPACT_ACTION_HOVER_STYLE}
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):focus-visible,
  html[data-zb-theme]
    .QuestionPage
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:not(.VoteButton):focus-visible,
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-actions
    .Button:not(.VoteButton):not(.Button--blue):focus-visible,
  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible,
  html[data-zb-theme]:where([data-zb-search-page="true"])
    .HotLanding
    :is(.ContentItem-actions, .RichContent-actions)
    :is(
      .Button:not(.VoteButton):focus-visible,
      .ShareMenu-toggler[aria-expanded="true"] .Button
    ),
  html[data-zb-theme][data-zb-topic-page="true"]
    .TopicFeedItem
    :is(.ContentItem-actions, .RichContent-actions)
    :is(
      .Button:not(.VoteButton):focus-visible,
      .ShareMenu-toggler[aria-expanded="true"] .Button
    ),
  html[data-zb-theme][data-zb-ring-host-page="true"]
    .PinItem
    .ContentItem-actions
    :is(
      .Button:not(.VoteButton):focus-visible,
      .ShareMenu-toggler[aria-expanded="true"] .Button
    ),
  html[data-zb-theme]
    .PinDetail
    .PinItem
    .ContentItem-actions
    :is(
      .Button:not(.VoteButton):focus-visible,
      .ShareMenu-toggler[aria-expanded="true"] .Button
    ),
  html[data-zb-theme][data-zb-profile-page="true"]
    .ProfileMain
    .ContentItem-actions
    .Button:not(.VoteButton):focus-visible {${COMPACT_ACTION_FOCUS_STYLE}
  }

  html[data-zb-theme]
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:is(
      [aria-label="已收藏"],
      [aria-label="收藏"]:is(:hover, :focus-visible)
    ) {
    color: var(--zb-warning) !important;
  }

  html[data-zb-theme]
    :is(.ContentItem-actions, .RichContent-actions)
    .Button:is(
      [aria-label="喜欢"]:is(:hover, :focus-visible),
      .Button--red,
      .is-active,
      [aria-label="取消喜欢"],
      [aria-pressed="true"]
    ):has(:is(.Zi--Heart, .Zi--HeartFill, .ZDI--HeartFill24)) {
    color: var(--zb-danger) !important;
  }

  html[data-zb-theme] .TopstoryItem-isFollow .ContentItem-more,
  html[data-zb-theme][data-zb-home-page="true"] .TopstoryItem .ContentItem-more,
  html[data-zb-theme][data-zb-column-page="true"] .ContentItem-more {${CONTENT_MORE_STYLE}
  }

  html[data-zb-theme]
    .TopstoryItem-isFollow
    .ContentItem-more:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-home-page="true"]
    .TopstoryItem
    .ContentItem-more:is(:hover, :focus-visible),
  html[data-zb-theme][data-zb-column-page="true"]
    .ContentItem-more:is(:hover, :focus-visible) {${CONTENT_MORE_ACTIVE_STYLE}
  }

  html[data-zb-theme]
    :is(
      [data-zb-home-sidebar],
      .Topstory-container > .Topstory-mainColumn + *
    )
    .HotSearchCard-tag,
  html[data-zb-theme] .Question-sideColumn .HotSearchCard-tag,
  html[data-zb-theme]:where([data-zb-search-page="true"])
    .Search-container
    .HotSearchCard-tag {${HOT_SEARCH_TAG_LAYOUT_STYLE}
  }
`;

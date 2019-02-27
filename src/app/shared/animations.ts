import { trigger, transition, style, animate, query, group, stagger } from '@angular/animations';

export const fadeAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [style({ position: 'absolute',  top: 0,  left: 0,  width: '100%' })],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0 })],
        { optional: true }
      ),
      group([
        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ])
  ]);

export const listAnimation =
  trigger('listAnimations', [
    transition('* => *', [ // each time the binding value changes
      // query(':leave', [
      //   stagger(100, [
      //     animate('0.4s', style({ opacity: 0 }))
      //   ])
      // ], { optional: true }),
      // query(':leave', animate('50ms', style({ opacity: 0 })), { optional: true }),
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('100ms', [
          animate('0.4s', style({ opacity: 1, transform: 'translateY(0px)' }))
        ])
      ], { optional: true })
    ])
  ]);

export class RouterAnimations {
  static routeSlide =
    trigger('routeSlide', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({transform: 'translateX({{offsetEnter}}%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX(0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX({{offsetLeave}}%)'}))
          ], {optional: true}),
        ])
      ]),
    ]);
  }

// export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('HomePage <=> AboutPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%'})
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('300ms ease-out', style({ left: '100%'}))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%'}))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ]),
//     transition('* <=> FilterPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%'})
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('200ms ease-out', style({ left: '100%'}))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%'}))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ])
//   ]);

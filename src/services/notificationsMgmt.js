/* global Notification */
import axios from '../axios'
import { urlBase64ToUint8Array } from './utility'

const displayNewSubNotification = () => {
  // The content that is a must see in the notification should be part of the
  // title and the body. This is because these two settings will mostly likely
  // be shown on every device whereas the others might not. For example the
  // image might be shown on some and not shown at all on other devices.
  const options = {
    // For text under the title, set body option
    body: 'You successfully subscribed to our notifications service!',
    // Icon appears on the right or left side of the pop-up notification
    icon: 'assets/icons/app-icon-96x96.png',
    // Image unlike icon is part of the body content
    // image: '/path_to_image',
    // Text direction (ltr is default)
    dir: 'ltr',
    // Set up for language that is BCP 47 compliant
    lang: 'en-US',
    // Vibration with pause in ms, 100ms vibration 50ms pause and then another
    // 200ms vibration and so on...
    vibrate: [100, 50, 200, 50, 100],
    // What appears as an "icon" besides the notification on the toolbar on
    // mobile devices. The badge recommended size is 96x96 and it will
    // automatically be updated into black and white color.
    badge: 'assets/icons/app-icon-96x96.png',
    // Tag acts as an id for the notification, if more than one notification
    // is sent to the device, having the same tag will make the notifications
    // stack. The latest notification will be shown last.
    tag: 'new-subscription',
    // Even if we use a tag and the same type of notification is sent to the
    // device renotify will make the device vibrate again if set to true.
    renotify: true,
    // PS: the tag and renotify as options together are like an anti spam method
    actions: [
      // The device might not support actions (buttons) or might support up to 2
      {
        // Id
        action: 'confirm',
        // Text displayed
        title: 'Ok',
        icon: 'assets/icons/app-icon-96x96.png'
      },
      {
        // Id
        action: 'cancel',
        // Text displayed
        title: 'Cancel',
        icon: 'assets/icons/app-icon-96x96.png'
      }
    ]
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (sw) {
      sw.showNotification('Successfully subscribed!', options)
    })
  } else {
    Notification('Successfully subscribed!', options)
  }
}

const displaySyncNotification = () => {
  const options = {
    body: 'The number will be upload as soon as you get internet connection!',
    icon: 'assets/icons/app-icon-96x96.png',
    dir: 'ltr',
    lang: 'en-US',
    vibrate: [100, 50, 200, 50, 100],
    badge: 'assets/icons/app-icon-96x96.png',
    tag: 'sync-queue-notification',
    renotify: true
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (sw) {
      sw.showNotification('Number added to sync queue!', options)
    })
  } else {
    Notification('Number added to sync queue!', options)
  }
}

const displayActiveSubNotification = () => {
  const options = {
    body: 'You are already subscribed to our notifications service!',
    icon: 'assets/icons/app-icon-96x96.png',
    dir: 'ltr',
    lang: 'en-US',
    vibrate: [100, 50, 200, 50, 100],
    badge: 'assets/icons/app-icon-96x96.png',
    tag: 'active-subscription',
    renotify: true
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (sw) {
      sw.showNotification('Already subscribed!', options)
    })
  } else {
    Notification('Already subscribed!', options)
  }
}

// Push notification subscription
const configurePushSubscription = () => {
  if (!('serviceWorker' in navigator)) {
    return
  }
  let swReg
  navigator.serviceWorker.ready
    .then(sw => {
      swReg = sw
      // Check if this service worker for this browser has active subscription
      return sw.pushManager.getSubscription()
    })
    .then(sub => {
      if (sub === null) {
        // Create new subscription
        // The Push API Endpoint can't be set here because it would be a security
        // issue. That is why we use VAPID with WebPush
        // https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/
        // We generate 2 keys as private and public combination, the private goes
        // on the application server and the public is used in the JavaScript code
        // This way someone would need to hack the server in order to start
        // sending push notifications.
        const convertedKey = urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
        swReg.pushManager
          .subscribe({
            // Only this user can see the specific push notification
            userVisibleOnly: true,
            // Set the vapid public key
            applicationServerKey: convertedKey
          })
          .then(newSub => {
            // POST new subscriptions to subs table
            return axios.post('subscriptions.json', newSub)
          })
          .then(res => {
            if (res.statusText === 'OK' || res.status === 200) {
              displayNewSubNotification()
            }
          })
          .catch(err => {
            console.log('[configurePushSubscription] Subscription failed', err)
          })
      } else {
        // Active subscription available
        displayActiveSubNotification()
      }
    })
    .catch(err => {
      console.log('[configurePushSubscription] Subscription failed', err)
    })
}

// This function asks for permission to send basic notifications and push
// notifications
export const enableNotifications = () => {
  Notification.requestPermission(result => {
    if (result === 'granted') {
      configurePushSubscription()
    }
  })
}

export const addedToSyncQueueNotification = () => {
  Notification.requestPermission(result => {
    if (result === 'granted') {
      displaySyncNotification()
    }
  })
}

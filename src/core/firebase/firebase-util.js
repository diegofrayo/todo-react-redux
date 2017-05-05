import {
  firebaseDb
} from './firebase';

// import {
//   getAuth
// } from 'src/core/auth';

export class FirebaseUtil {
  constructor(actions, modelClass, path = null) {
    this._actions = actions;
    this._modelClass = modelClass;
    this._path = path;
    this._postPath = 'path';
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._accountPath = `${value}`;
    this._path = `${value}/posts`;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe(emit) {
    let refTasks = firebaseDb.ref(`${this._path}`);
    let initialized = false;
    let list = [];

    firebaseDb.ref(this._accountPath).once('value', (snapshot) => {

      initialized = true;

      let payload = snapshot.val();

      if (payload === null) {
        // const authId = getAuth().id;
        // name: `user-${authId ? authId : 'anonymous'}`,
        payload = {
          is_private: false,
          name: 'heyeee'
        };
        snapshot.ref.update(payload);
      }

      payload.posts = list;

      emit(this._actions.onLoad(payload));
    });

    refTasks.on('child_added', snapshot => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      } else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    refTasks.on('child_changed', snapshot => {
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    refTasks.on('child_removed', snapshot => {
      emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    this._unsubscribe = () => refTasks.off();
  }

  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snapshot) {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs);
  }

  updateAccountConfig(path, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(path)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  getPublicLists() {
    return new Promise((resolve, reject) => {
      firebaseDb.ref('tasks')
        .once('value', snapshot => {

          const data = snapshot.val();
          const publicLists = [];

          if (data !== null) {
            Object.keys(data).forEach((key) => {
              const list = data[key];
              if (list.is_private === false) {
                publicLists.push(list);
              }
            });
          }

          resolve(publicLists);
        });
    });
  }

  getListById(id) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`tasks/${id}`)
        .once('value', snapshot => {

          const data = snapshot.val();
          let list = null;

          if (data !== null) {

            list = {
              name: data.name,
              posts: []
            };

            let posts = data.posts;

            if (posts) {
              Object.keys(posts).forEach((key) => {
                const post = posts[key];
                if (!post.is_private) {
                  posts.push(post);
                }
              });
            }
          }

          resolve(list);
        });
    });
  }
}

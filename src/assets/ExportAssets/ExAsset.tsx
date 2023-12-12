
export let Selected:any
const isLocalStorageAvailable = typeof localStorage !== 'undefined';
if (isLocalStorageAvailable) {
    const SavedProfile = JSON.parse(localStorage.getItem('selectedMovie') || 'null')
    Selected = SavedProfile
}
export function pushToSelected(movie:any) {
    Selected = movie
    saveToLocal()
}
function saveToLocal() {
    localStorage.setItem('selectedMovie', JSON.stringify(Selected));
}
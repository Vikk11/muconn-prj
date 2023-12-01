import React from 'react'
import PlaylistImg from "../assets/top-hits.png";
import "../styles/PlaylistSong.css";

function PlaylistSong() {
  return (
    <div >
      <table>
        <thead>
          <tr className="playlist-headers">
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th><i class='bx bx-time'></i></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <div class="song-info">
                <img src={PlaylistImg} />
                <div class="song-details">
                  <div className="song-title">Song 1 Title</div>
                  <div className="song-artist">Artist 1</div>
                </div>
              </div>
            </td>
            <td>Album 1</td>
            <td>Oct 11, 2023</td>
            <td>3:52</td>
          </tr>
          <tr class="line-separator">
            <td>2</td>
            <td>
              <div class="song-info">
                <img src={PlaylistImg} />
                <div class="song-details">
                  <div className="song-title">Song 2 Title</div>
                  <div className="song-artist">Artist 2</div>
                </div>
              </div>
            </td>
            <td>Album 2</td>
            <td>Oct 12, 2023</td>
            <td>4:20</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PlaylistSong
'use strict'

import logic from '.'
import spotifyApi from '../vendor/spotify-api/1.0.0'

const { REACT_APP_SPOTIFY_TOKEN } = process.env

spotifyApi.token = REACT_APP_SPOTIFY_TOKEN

describe('logic', function () {
    describe('search artists', function () {
        it('should succeed on matching query', function (done) {
            const query = 'madonna'

            logic.searchArtists(query, function (error, artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
    })

    describe('retrieve albums', function () {
        it('should succeed on retrieve the correct albums from a certain artist', function (done) {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW'

            logic.retrieveAlbums(artistId, function (error, albums) {
                expect(error).toBeUndefined()

                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)
                
                albums.forEach(albums => expect(albums.artists[0].id).toBe(artistId))

                done()
            })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveAlbums(artistId, function (error, albums) { })).toThrowError('artistId is empty')
        })

        it('should fail on non string artistId', function () {
            const artistId = [1,2,3]

            expect(() => logic.retrieveAlbums(artistId, function (error, albums) { })).toThrowError(`${artistId} is not a string`)
        })

    })

    describe('retrieve tracks', function () {
        it('should succeed on retrieve the correct tracks from a certain album', function (done) {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X'
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW'

            logic.retrieveTracks(albumId, function (error, tracks) {
                expect(error).toBeUndefined()

                expect(tracks).toBeDefined()
                expect(tracks instanceof Array).toBeTruthy()
                expect(tracks.length).toBeGreaterThan(0)

                tracks.forEach(tracks => expect(tracks.artists[0].id).toBe(artistId))

                done()
            })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => logic.retrieveTracks(albumId, function (error, tracks) { })).toThrowError('albumId is empty')
        })

        it('should fail on non string albumId', function () {
            const albumId = [1,2,3]

            expect(() => logic.retrieveTracks(albumId, function (error, tracks) { })).toThrowError(`${albumId} is not a string`)
        })

    })

})
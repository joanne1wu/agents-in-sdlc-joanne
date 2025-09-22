<script lang="ts">
    import { onMount } from "svelte";

    interface Game {
        id: number;
        title: string;
        description: string;
        publisher_name?: string;
        category_name?: string;
    }

    export let games: Game[] = [];
    let loading = true;
    let error: string | null = null;

    const fetchGames = async () => {
        loading = true;
        try {
            const response = await fetch('/api/games');
            if(response.ok) {
                games = await response.json();
            } else {
                error = `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        } catch (err) {
            error = `Error: ${err instanceof Error ? err.message : String(err)}`;
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        fetchGames();
    });
</script>

<div>
    <!-- Enhanced Section Header -->
    <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-100 via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Featured Games
        </h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover innovative board games inspired by the world of software development and DevOps culture
        </p>
        <div class="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
    </div>
    
    {#if loading}
        <!-- Enhanced Loading Animation -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each Array(6) as _, i}
                <div class="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
                    <div class="p-8">
                        <div class="animate-pulse">
                            <div class="h-7 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl w-3/4 mb-4"></div>
                            <div class="flex gap-2 mb-4">
                                <div class="h-5 bg-blue-900/60 rounded-full w-16"></div>
                                <div class="h-5 bg-purple-900/60 rounded-full w-20"></div>
                            </div>
                            <div class="space-y-2 mb-6">
                                <div class="h-4 bg-slate-700 rounded-lg w-full"></div>
                                <div class="h-4 bg-slate-700 rounded-lg w-5/6"></div>
                                <div class="h-4 bg-slate-700 rounded-lg w-4/6"></div>
                            </div>
                            <div class="h-5 bg-blue-600/30 rounded-lg w-1/3"></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if error}
        <!-- Enhanced Error Display -->
        <div class="text-center py-16 bg-gradient-to-br from-red-900/20 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-700/30">
            <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong</h3>
            <p class="text-red-400">{error}</p>
        </div>
    {:else if games.length === 0}
        <!-- Enhanced Empty State -->
        <div class="text-center py-16 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div class="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-300 mb-2">No Games Available</h3>
            <p class="text-slate-400">Check back soon for exciting new games to explore!</p>
        </div>
    {:else}
        <!-- Enhanced Game Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="games-grid">
            {#each games as game (game.id)}
                <a 
                    href={`/game/${game.id}`} 
                    class="group block relative overflow-hidden bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                    data-testid="game-card"
                    data-game-id={game.id}
                    data-game-title={game.title}
                >
                    <!-- Card Background Effects -->
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- Animated Border Glow -->
                    <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div class="relative z-10 p-8 h-full flex flex-col">
                        <!-- Game Title -->
                        <h3 class="text-2xl font-bold text-slate-100 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300" data-testid="game-title">
                            {game.title}
                        </h3>
                        
                        <!-- Tags -->
                        {#if game.category_name || game.publisher_name}
                            <div class="flex flex-wrap gap-2 mb-4">
                                {#if game.category_name}
                                    <span class="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm" data-testid="game-category">
                                        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                        {game.category_name}
                                    </span>
                                {/if}
                                {#if game.publisher_name}
                                    <span class="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm" data-testid="game-publisher">
                                        <div class="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                        {game.publisher_name}
                                    </span>
                                {/if}
                            </div>
                        {/if}
                        
                        <!-- Game Description -->
                        <p class="text-slate-300 mb-6 text-base leading-relaxed flex-grow line-clamp-3 group-hover:text-slate-200 transition-colors duration-300" data-testid="game-description">
                            {game.description}
                        </p>
                        
                        <!-- Call to Action -->
                        <div class="mt-auto">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                                    <span>Explore Game</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                
                                <!-- Progress Indicator (Visual Element) -->
                                <div class="flex items-center gap-1">
                                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span class="text-xs text-green-400 font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Subtle Corner Accent -->
                    <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent rounded-2xl"></div>
                </a>
            {/each}
        </div>
    {/if}
</div>
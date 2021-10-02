<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeveloperRequest;
use App\Http\Resources\DeveloperResource;
use App\Models\Developer;
use App\Services\SearchDevelopersService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DevelopersController extends Controller
{
    private SearchDevelopersService $searchDevelopers;

    public function __construct(SearchDevelopersService $searchDevelopers)
    {
        $this->searchDevelopers = $searchDevelopers;
    }


    public function index(Request $request)
    {
        $search = $request->input('q', '');

        $developers = $this->searchDevelopers->execute($search);
        return DeveloperResource::collection($developers);
    }


    public function store(DeveloperRequest $request)
    {
        $data = $request->validated();
        $developer = Developer::create($data);

        $developerResponse = new DeveloperResource($developer);

        return response()->json($developerResponse, Response::HTTP_CREATED);
    }


    public function show(Developer $developer)
    {
        $developerResponse = new DeveloperResource($developer);
        $developerResponse->withoutWrapping();
        return $developerResponse;
    }


    public function update(DeveloperRequest $request, Developer $developer)
    {
        $data = $request->validated();

        $developer->fill($data)->save();
        $developerResponse = new DeveloperResource($developer);
        $developerResponse->withoutWrapping();

        return $developerResponse;
    }

    public function destroy(Developer $developer)
    {
        $developer->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}

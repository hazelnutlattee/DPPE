<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// this code use to ensure user only can delete their own account
class PermissionReviewController extends Controller
{
    // Save a new permission review
    public function store(Request $request)
    {
        $validated = $request->validate([
            'permission1' => 'required|in:Allow,Deny',
            'permission2' => 'required|in:Allow,Deny',
            'permission3' => 'required|in:Allow,Deny',
            'permission4' => 'required|in:Allow,Deny',
        ]);

        //$request->user()->permissionReviews()->create($validated); simpan previous data

        //bawah ni delete previous data bila user tekan save review, so bila user tekan save review baru, previous data akan delete
        $request->user()->permissionReviews()->delete();

        $request->user()->permissionReviews()->create($validated);

        return back()->with('success', 'Review saved successfully.');
    }


    //    return response()->json(
    //        $request->user()->permissionReviews()->latest()->get() //siplay previuous data

    public function index(Request $request)
    {
        return response()->json(
            $request->user()->permissionReviews()->latest()->take(1)->get()
        );
    }

    // Delete a saved review
    public function destroy(Request $request, $id)
    {
        $review = $request->user()
            ->permissionReviews()
            ->findOrFail($id);

        $review->delete();

        return back()->with('success', 'Review deleted successfully.');
    }
}